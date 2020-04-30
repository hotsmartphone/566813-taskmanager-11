import {createSiteMenuTemplate} from './components/site-menu-template.js';
import {createFilterTemplate} from './components/filter-template.js';
import {createBoardTemplate} from './components/board-template.js';
import {createTaskTemplate} from './components/task-template.js';
import {createTaskEditTemplate} from './components/task-edit-template.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button-template.js';
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(tasks));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
.forEach((task) => render(taskListElement, createTaskTemplate(task)));

render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
