import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing student data
const STUDENT_DATA_KEY = 'students';

// Save a new student
export const saveStudent = async (student) => {
  try {
    const existingStudents = JSON.parse(await AsyncStorage.getItem(STUDENT_DATA_KEY)) || [];
    existingStudents.push(student);
    await AsyncStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(existingStudents));
    return true;
  } catch (error) {
    console.error('Error saving student:', error);
    return false;
  }
};

// Fetch all students
export const getAllStudents = async () => {
  try {
    const students = JSON.parse(await AsyncStorage.getItem(STUDENT_DATA_KEY)) || [];
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

// Find a student by email and password
export const findStudent = async (email, password) => {
  try {
    const students = await getAllStudents();
    return students.find((student) => student.email === email && student.password === password) || null;
  } catch (error) {
    console.error('Error finding student:', error);
    return null;
  }
};
