# Entrepresenteur (entrepreneur + presenter)

Модель: https://drive.google.com/file/d/1D2B2oH6q4FZ222T_QfXJKvFrzsW43vOf/view

![Model](.github/Model.jpg?raw=True "Model")

## Деплой приложения

Чтобы задеплоить приложение на Heroku, необходимо:

1. Переключиться на бранч deployment
2. Подмержить последние изменения
3. Запустить билд: `yarn build`
4. Застейджить изменения в билде: `git add build -f`
5. Запушить изменения в удаленный бранч heroku:master, дождаться завершения билда
6. Если все прошло хорошо, запушить бранч в origin:master
