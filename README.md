## Как запустить проект

Создайте `.env` формата

```json
    HOST=http://ВАШ_АЙПИ:3000

    HCAPTCHA_SECRET=ВАШ_СЕКРЕТНЫЙ_КЛЮЧ
    HCAPTCHA_SITEKEY=ВАШ_КЛЮЧ_САЙТА

    SMTP_HOST=SMTP-ХОСТ
    SMTP_LOGIN=ЛОГИН-ПОЧТА
    SMTP_PASS=ПАРОЛЬ
    REQUESTS_MAIL=ПОЧТА_ДЛЯ_ПОЛУЧЕНИЯ_ЗАЯВОК
```

Перед запуском прописать `npm config set npm_config_ip=ВАШ_IP`, необходимо для того чтобы hCaptcha могла делать запрос на свои сервера (`localhost` и `127.0.0.1` под баном)
