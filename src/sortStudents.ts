
export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades'
}

export type SortOrder = 'asc' | 'desc';

export function getAverageGrade(person: Student): number {
  return person.grades.reduce((sum, mark) => (
    sum + mark), 0) / person.grades.length;
}

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const studentsCopy: Student[] = [...students];

  switch (sortBy) {
    case ('name'):
    case ('surname'):
      return studentsCopy.sort((a, b) => (
        (order === 'asc')
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy])
      ));

    case ('age'):
    case ('married'):
      return studentsCopy.sort((a, b) => (
        (order === 'asc')
          ? Number(a[sortBy]) - Number(b[sortBy])
          : Number(b[sortBy]) - Number(a[sortBy])
      ));

    case ('grades'):
      return studentsCopy.sort((a, b) => (
        (order === 'asc')
          ? getAverageGrade(a) - getAverageGrade(b)
          : getAverageGrade(b) - getAverageGrade(a)
      ));

    default:
      throw Error('There is no such property. Lets try another :)');
  }
}
