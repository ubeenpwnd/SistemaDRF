export interface Student {
  id: string;
  name: string;
  faceDescriptor: number[];
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: Date;
  validatedByFace: boolean;
}
