# Entrepresenteur (entrepreneur + presenter)

![GitHub issues by-label](https://img.shields.io/github/issues/m3tro1d/entrepresenteur/task?color=%230B4FAD&label=current%20issues)
![GitHub issues by-label](https://img.shields.io/github/issues/m3tro1d/entrepresenteur/backlog?color=%23fef2c0&label=backlog%20issues)

Модель: https://drive.google.com/file/d/1D2B2oH6q4FZ222T_QfXJKvFrzsW43vOf/view

<p align="center">
  <img src=".github/Model.jpg" alt="Model">
</p>

## Деплой приложения

Чтобы задеплоить приложение на Heroku, необходимо:

1. Переключиться на бранч master
2. Подмержить изменения из фичеветок, которые должны попасть в релиз
3. Переключиться на бранч deployment
4. Подмержить изменения из master (аккуратно разрулить возможные конфликты!)
5. Запустить удаленный билд через `git push heroku deployment:master`
6. Дождаться пока stage build отработает
7. Если все ОК, запушить изменения в `origin:deployment`
