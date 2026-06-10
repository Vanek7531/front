import { CATEGORY_ORDER } from './config.js';

export function getCategoryCounts(courses) {
  const counts = { All: courses.length };

  courses.forEach(({ category }) => {
    counts[category] = (counts[category] || 0) + 1;
  });

  return counts;
}

export function getVisibleCategories(counts) {
  return CATEGORY_ORDER.filter(
    (category) => category === 'All' || counts[category] > 0
  );
}

export function filterCourses(courses, { category, query }) {
  const normalizedQuery = query.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesCategory = category === 'All' || course.category === category;
    const matchesQuery =
      !normalizedQuery || course.title.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}
