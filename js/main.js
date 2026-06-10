import { COURSES_PER_PAGE } from './config.js';
import { fetchCourses } from './api.js';
import { filterCourses, getCategoryCounts, getVisibleCategories } from './filter.js';
import { createCourseCard, createFilterItem } from './render.js';

const filterNav = document.getElementById('filter-nav');
const coursesGrid = document.getElementById('courses-grid');
const searchInput = document.getElementById('search-input');
const loadMoreBtn = document.getElementById('load-more');
const emptyState = document.getElementById('courses-empty');

const state = {
  courses: [],
  activeCategory: 'All',
  searchQuery: '',
  visibleCount: COURSES_PER_PAGE,
};

function getFilteredCourses() {
  return filterCourses(state.courses, {
    category: state.activeCategory,
    query: state.searchQuery,
  });
}

function renderFilters() {
  const counts = getCategoryCounts(state.courses);
  const categories = getVisibleCategories(counts);

  filterNav.replaceChildren(
    ...categories.map((category) =>
      createFilterItem(category, counts[category], category === state.activeCategory)
    )
  );
}

function renderCourses() {
  const filtered = getFilteredCourses();
  const visible = filtered.slice(0, state.visibleCount);

  coursesGrid.replaceChildren(...visible.map(createCourseCard));

  const hasResults = filtered.length > 0;
  const hasMore = filtered.length > state.visibleCount;

  emptyState.hidden = hasResults;
  coursesGrid.hidden = !hasResults;
  loadMoreBtn.hidden = !hasResults || !hasMore;
}

function updateView() {
  renderFilters();
  renderCourses();
}

function setCategory(category) {
  state.activeCategory = category;
  state.visibleCount = COURSES_PER_PAGE;
  updateView();
}

function setSearchQuery(query) {
  state.searchQuery = query;
  state.visibleCount = COURSES_PER_PAGE;
  updateView();
}

function loadMore() {
  state.visibleCount += COURSES_PER_PAGE;
  renderCourses();
}

filterNav.addEventListener('click', (event) => {
  const button = event.target.closest('.filter-nav__button');

  if (!button) return;

  setCategory(button.dataset.category);
});

searchInput.addEventListener('input', (event) => {
  setSearchQuery(event.target.value);
});

loadMoreBtn.addEventListener('click', loadMore);

async function init() {
  try {
    state.courses = await fetchCourses();
    updateView();
  } catch (error) {
    console.error(error);
    emptyState.hidden = false;
    emptyState.textContent = 'Failed to load courses. Please try again later.';
    coursesGrid.hidden = true;
    loadMoreBtn.hidden = true;
  }
}

init();
