import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user'; // adjust path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7065/users'; // replace with your actual API URL

  constructor(private http: HttpClient) { }

  async getUsers(): Promise<User[]> {
    const response = await this.http.get<User[]>(this.apiUrl).toPromise();
    if (response) {
      return response;
    } else {
      throw new Error('Error fetching users');
    }
  }
  
  async addUser(user: User): Promise<User> {
    const response = await this.http.post<User>(this.apiUrl, user).toPromise();
    if (response) {
      return response;
    } else {
      throw new Error('User not created');
    }
  }
  
  async deleteUser(id: number): Promise<void> {
    await this.http.delete(`${this.apiUrl}/${id}`).toPromise();
  }
}
