import json
import os
import boto3
import requests

YADISK_PUBLIC_KEY = "https://disk.yandex.ru/d/sgSAzR5UWA7fLw"
YADISK_API = "https://cloud-api.yandex.net/v1/disk/public/resources/download"


def get_download_url(filename: str) -> str:
    resp = requests.get(YADISK_API, params={
        "public_key": YADISK_PUBLIC_KEY,
        "path": f"/{filename}",
    }, timeout=15)
    resp.raise_for_status()
    return resp.json()["href"]


def handler(event: dict, context) -> dict:
    """Скачивает фото с Яндекс Диска по имени файла и загружает на CDN S3"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    # photos: [{"filename": "IMG_0303.jpg", "key": "viatek/hero.jpg"}]
    photos = body.get("photos", [])

    if not photos:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "photos required"}),
        }

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    project_id = os.environ["AWS_ACCESS_KEY_ID"]
    results = []

    for photo in photos:
        filename = photo.get("filename")
        key = photo.get("key")
        if not filename or not key:
            continue

        download_url = get_download_url(filename)
        resp = requests.get(download_url, timeout=60)
        if resp.status_code != 200:
            results.append({"key": key, "error": f"download failed: {resp.status_code}"})
            continue

        content_type = "image/jpeg"
        if filename.lower().endswith(".png"):
            content_type = "image/png"
        elif filename.lower().endswith(".webp"):
            content_type = "image/webp"

        s3.put_object(
            Bucket="files",
            Key=key,
            Body=resp.content,
            ContentType=content_type,
        )

        cdn_url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{key}"
        results.append({"key": key, "cdn_url": cdn_url, "filename": filename})

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"results": results}),
    }