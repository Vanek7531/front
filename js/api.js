export async function fetchCourses(url = './mok.json') {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load courses: ${response.status}`);
  }

  return response.json();
}
