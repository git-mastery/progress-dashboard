export interface LessonInfo {
  path: string;
  title: string;
}

export interface DetourInfo {
  lesson: LessonInfo;
  title: string;
}

export interface Exercise {
  key: string;
  identifier: string;
  lesson: LessonInfo;
  detour?: DetourInfo;
}
