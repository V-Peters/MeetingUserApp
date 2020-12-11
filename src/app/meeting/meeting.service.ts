import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meeting } from './meeting.model';
import { User } from '../authentification/user.model';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  isLoading: boolean;
  meetings: Meeting[];
  meetingsExists: boolean;
  isLoggedIn: boolean;

  private MEETING_URL = 'https://meeting-user-server.herokuapp.com/meetings/';

  constructor(private http: HttpClient) {}

  getMeetings(): Observable<Meeting[]> {
    return this.http
    .get<Meeting[]>(
      this.MEETING_URL
    );
  }

  getMeeting(id: number): Observable<Meeting> {
    return this.http
    .get<Meeting>(
      this.MEETING_URL + id
    );
  }

  saveMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http
    .post<Meeting>(
      this.MEETING_URL,
      meeting
    );
  }

  deleteMeeting(meetingId: number): Observable<Meeting> {
    return this.http
    .delete<Meeting>(
      this.MEETING_URL + meetingId
    );
  }

  updateDisplay(display: {}): Observable<boolean> {
    return this.http
    .post<boolean>(
      this.MEETING_URL + 'updateDisplay',
      display
    );
  }

  updateSignup(signup: {}): Observable<boolean[]> {
    return this.http
    .post<boolean[]>(
      this.MEETING_URL + 'updateSignup',
      signup
    );
  }

  getUser(userId: number): Observable<User> {
    return this.http
    .get<User>(
      this.MEETING_URL + 'getUser/' + userId
    );
  }
}
