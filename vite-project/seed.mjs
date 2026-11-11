// Создание готовой БД для фильтрации

import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

const db = new DatabaseSync(join(import.meta.dirname, 'students.db'));

db.exec(`
  drop table if exists students;

  create table students(
    id integer primary key autoincrement,
    name text not null,
    iq integer not null,
    sex text not null,
    status text not null check(status in ('был', 'н', 'оп', 'б'))
  );
`);

// ИСПРАВЛЕНО: заменили колонку is_present на status
const insert = db.prepare('insert into students (name, iq, sex, status) values (?, ?, ?, ?)');

const rows = [
  ['Анастасия Шпомер', 67, 'female', 'был'],
  ['Виолетта Бондаренко', 142, 'female', 'был'],
  ['Роман Ровда', 89, 'male', 'оп'],
  ['Андрей Дубинин', 181, 'male', 'был'],
  ['Алина Парута', 71, 'female', 'был'],
  ['Анастасия Смирнова', 118, 'female', 'был'],
  ['Никита Нестеренко', 73, 'male', 'был'],
  ['Ксения Карчевская', 41, 'female', 'был'],
  ['Борис Ищенко', 131, 'male', 'был'],
  ['Светлана Коровкина', 95, 'female', 'был'],
  ['Настя Богданова', 58, 'female', 'б'],
  ['Артем Тесов', 141, 'male', 'оп'],
  ['Владимир Судаков', 74, 'male', 'был'],
  ['Валерий Лянг', 79, 'male', 'был'],
  ['Александр Пахомов', 46, 'male', 'н'],
  ['Роман Марковин', 131, 'male', 'был'],
  ['Михаил Старчуков', 96, 'male', 'был'],
  ['Данила Дмитриевич Парамонов', 124, 'male', 'оп'],
  ['Константин Ковалевский', 108, 'male', 'был'],
  ['Роман Живетин', 67, 'male', 'был'],
  ['Надежда Жарикова', 142, 'female', 'был'],
  ['Александр Стренин', 89, 'male', 'был'],
  ['Сергей Перевозников', 11, 'male', 'б'],
  ['Виктория Пономарева', 74, 'female', 'был'],
  ['Татьяна Колесникова', 110, 'female', 'был'],
  ['Анастасия Евсеева', 78, 'female', 'б'],
  ['Арнеста Мисюнайте', 47, 'female', 'был'],
  ['Дмитрий Масленников', 404, 'male', 'оп'],
];


for (const [name, iq, sex, status] of rows) {
  insert.run(name, iq, sex, status);
}

console.log('Строк в базе:', db.prepare('select count(*) as n from students').get().n);
db.close();
