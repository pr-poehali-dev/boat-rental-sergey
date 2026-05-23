import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявок с сайта на почту viatek@bk.ru"""

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
    name = body.get("name", "Не указано")
    phone = body.get("phone", "")
    message = body.get("message", "")
    form_id = body.get("formId", "form")

    if not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            "body": json.dumps({"error": "Phone required"}),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "viatek@bk.ru"
    recipient = "viatek@bk.ru"

    subject = f"Новая заявка с сайта Viatek-Relax [{form_id}]"
    html_body = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #14556f;">Новая заявка с сайта</h2>
    <table style="border-collapse:collapse; width:100%; max-width:500px;">
      <tr><td style="padding:8px; background:#f0f7fa; font-weight:bold;">Имя</td>
          <td style="padding:8px;">{name}</td></tr>
      <tr><td style="padding:8px; background:#f0f7fa; font-weight:bold;">Телефон</td>
          <td style="padding:8px;"><a href="tel:{phone}">{phone}</a></td></tr>
      <tr><td style="padding:8px; background:#f0f7fa; font-weight:bold;">Сообщение</td>
          <td style="padding:8px;">{message or '—'}</td></tr>
      <tr><td style="padding:8px; background:#f0f7fa; font-weight:bold;">Форма</td>
          <td style="padding:8px;">{form_id}</td></tr>
    </table>
    <p style="color:#888; font-size:12px; margin-top:20px;">Автоматическое письмо с сайта viatek-relax.ru</p>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
            server.login(sender, smtp_password)
            server.sendmail(sender, recipient, msg.as_string())
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"ok": True, "formId": "otpform"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)}),
        }