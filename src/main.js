import {createSiteMenuTemplate} from './components/site-menu-template.js';
import {createFilterTemplate} from './components/filter-template.js';
import {createBoardTemplate} from './components/board-template.js';
import {createTaskTemplate} from './components/task-template.js';
import {createTaskEditTemplate} from './components/task-edit-template.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button-template.js';

const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

render(boardElement, createLoadMoreButtonTemplate());
