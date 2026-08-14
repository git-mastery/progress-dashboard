export interface LessonInfo {
  lesson_name: string;
  title: string;
}

export interface DetourInfo {
  lesson: LessonInfo;
  title: string;
}

export interface Exercise {
  key: string;
  identifier: string;
  parentLesson: LessonInfo;
  detour?: DetourInfo;
}
