const getTodayTasksCount = (tasks) => {
  const currentTime = new Date();
  return tasks.filter((task) =>
    task.dueDate instanceof Date
    && task.dueDate.getDate() === currentTime.getDate()
    && task.dueDate.getMonth() === currentTime.getMonth()
    && task.dueDate.getFullYear() === currentTime.getFullYear()
  )
  .length;
};

const getRepeatingTasksCount = (tasks) => {
  let repeatingTasksCount = 0;
  for (const task of tasks) {
    for (const key in task.repeatingDays) {
      if (task.repeatingDays[key]) {
        repeatingTasksCount++;
        break;
      }
    }
  }
  return repeatingTasksCount;
};

const getFiltersCount = (tasks) => {
  return ({
    "all": tasks.length,
    "overdue": tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length,
    "today": getTodayTasksCount(tasks),
    "favorites": tasks.filter((task) => task.isFavorite).length,
    "repeating": getRepeatingTasksCount(tasks),
    "archive": tasks.filter((task) => task.isArchive).length,
  });
};

const generatefilters = (filtersCount) => {
  const filtersArrFromObj = Object.entries(filtersCount);
  const filtersArr = [];
  filtersArrFromObj.forEach((key) => {
    filtersArr.push({
      "title": key[0],
      "count": key[1],
    });
  });
  return filtersArr;
};

const createFilterMarkup = (filter, isChecked) => {
  const {title, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

const createFilterTemplate = (tasks) => {
  const filters = generatefilters(getFiltersCount(tasks));
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};

export {createFilterTemplate};
