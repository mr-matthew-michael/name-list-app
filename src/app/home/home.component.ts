import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // adjust path as necessary
import { User } from '../models/user'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  people: User[] = [];

  constructor(private userService: UserService) { }

  async ngOnInit() {
    try {
      this.people = await this.userService.getUsers();
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  async addPerson(name: string, email: string) {
    if (name && email) {
      
      const newPerson: User = {name, email };
      try {
        const createdUser = await this.userService.addUser(newPerson);
        this.people.push(createdUser);
        console.log('User added', createdUser);
      } catch (error) {
        console.error('Error creating user', error);
      }
    }
  }

  async removePerson(id: number) {
    try {
      await this.userService.deleteUser(id);
      this.people = this.people.filter(user => user.id !== id);
      console.log('User removed', id);
    } catch (error) {
      console.error('Error removing user', error);
    }
  }
  
}
