import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {StageComponent} from './stage/stage.component';
import {TaskComponent} from './task/task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { CreateBoardComponent } from './dialog/create-board/create-board.component';
import {BoardsService} from './boards.service';
import { CreateTaskComponent } from './dialog/create-task/create-task.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StageComponent,
    TaskComponent,
    DialogComponent,
    CreateBoardComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BoardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
