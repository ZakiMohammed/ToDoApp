import { Component, OnInit } from '@angular/core';

@Component({
    selector: "app-root",
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    title: string = 'ToDo App';
    task: Task = new Task();
    taskList: Task[] = [];
    limit: number = 10;
    storageKey: string = 'taskList';

    ngOnInit(): void {
        let taskListStore = localStorage.getItem(this.storageKey);
        if (taskListStore) {
            this.taskList = JSON.parse(taskListStore);
        }
    }

    onAddClick() {

        if (!this.task.name) {
            return;
        }
        if (this.taskList.length === this.limit) {
            return;
        }

        this.task.id = Math.floor(Math.random() * 1000).toString();
        this.task.date = new Date();
        this.taskList.push({...this.task});
        this.task = new Task();

        localStorage.setItem(this.storageKey, JSON.stringify(this.taskList));
    }

    onRemoveClick(index: number) {
        this.taskList.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(this.taskList));
    }

    onRemoveAllClick() {
        this.taskList = [];
        localStorage.setItem(this.storageKey, JSON.stringify(this.taskList));
    }

}
class Task {
    id: string;
    name: string;
    date: Date;
}