import { CATEGORY_MODIFIERS } from './config.js';

const cardTemplate = document.getElementById('course-card-template');
const filterTemplate = document.getElementById('filter-item-template');

export function createCourseCard(course) {
  const node = cardTemplate.content.cloneNode(true);
  const modifier = CATEGORY_MODIFIERS[course.category];

  const image = node.querySelector('.course-card__image');
  image.src = course.image;
  image.alt = course.title;

  const badge = node.querySelector('.course-card__badge');
  badge.textContent = course.category;
  badge.classList.add(`course-card__badge--${modifier}`);

  node.querySelector('.course-card__title').textContent = course.title;
  node.querySelector('.course-card__price').textContent = `$${course.price}`;
  node.querySelector('.course-card__author').textContent = course.instructor;

  return node;
}

export function createFilterItem(category, count, isActive) {
  const node = filterTemplate.content.cloneNode(true);
  const item = node.querySelector('.filter-nav__item');
  const button = node.querySelector('.filter-nav__button');

  item.classList.toggle('filter-nav__item--active', isActive);
  button.dataset.category = category;
  node.querySelector('.filter-nav__label').textContent = category;
  node.querySelector('.filter-nav__count').textContent = count;

  return node;
}
