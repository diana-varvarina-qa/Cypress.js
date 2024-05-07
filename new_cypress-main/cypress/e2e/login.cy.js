import * as data from "../helpers/default_data.json"

import * as main_page from "../locators/main_page.json"

import * as result_page from "../locators/result_page.json"

import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

  beforeEach('Начало теста', function () {
    cy.visit('/');//Зашли на сайт
    cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
      });//Проверили цвет кнопки восстановить пароль

      afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');//Есть крестик и он виден для пользователям 
       });

    it('Верный пароль и верный логин', function () {
         cy.get( main_page.email).type(data.login);//Ввели верный логин
         cy.get( main_page.password).type(data.password);//Ввели верный пароль
         cy.get( main_page.login_button).click();//Нажали войти
         cy.get(result_page.title).should('be.visible');//Текст виден пользователю
         cy.get(result_page.title).contains('Авторизация прошла успешно');//Проверили ,что после авториз.вижу текст
         
     })
 
       it('Верный логин и неверный пароль', function () {
         cy.get(main_page.email).type(data.login);//Ввели верный логин
         cy.get(main_page.password).type('iLoveqastudio2');//Ввели неверный пароль
         cy.get(main_page.login_button).click();//Нажали войти
         cy.get(result_page.title).should('be.visible');//Текст виден пользователю
         cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверили что видим текст
         
     })
 
       it('Валидация на наличие @', function () {
         cy.get(main_page.email).type('germandolnikov.ru');//Ввели неверный логин без @
         cy.get(main_page.password).type('iLoveqastudio');//Ввели неверный пароль без цифры
         cy.get(main_page.login_button).click();//Нажали войти
         cy.get(result_page.title).should('be.visible');//Текст виден пользователям
         cy.get(result_page.title).contains('Нужно исправить проблему валидации');//Проверили что видим текст
       })
 
        it('Восстановление пароля', function () {
         cy.get(main_page.fogot_pass_btn).click();//Нажали "забыли пароль"
         cy.get(recovery_page.email).type('german@dolnikov.ru');//Ввели почту
         cy.get(recovery_page.send_button).click();//Нажали отправить код
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//Проверили что видим текст
         
     })
     it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov5.ru');//Ввели неверный логин
        cy.get(main_page.password).type(data.password);//Ввели верный пароль
        cy.get(main_page.login_button).click();//Нажали войти
        cy.get(result_page.title).should('be.visible');//Текст виден пользователям
        cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверили что видим текст
         
    })
    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type(' GerMan@Dolnikov.ru');//Ввели правильный логин со строчными буквами
        cy.get(main_page.password).type(data.password);//Ввели правильный пароль
        cy.get(main_page.login_button).click();//Нажали войти
        cy.get(result_page.title).should('be.visible');//Текст виден пользователям
        cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверили что видим текст
        
    })
    
})
