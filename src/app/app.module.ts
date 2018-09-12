import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './kanban/board/board.component';
import {StageComponent} from './kanban/board/stage/stage.component';
import {TaskComponent} from './kanban/board/stage/task/task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from './kanban/dialog/dialog.component';
import {CreateBoardComponent} from './kanban/dialog/create-board/create-board.component';
import {CreateTaskComponent} from './kanban/dialog/create-task/create-task.component';
import {DetailsComponent} from './kanban/dialog/details/details.component';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from './services/backend.service';
import {KanbanComponent} from './kanban/kanban.component';
import {KanbanService} from './services/kanban.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StageComponent,
    TaskComponent,
    DialogComponent,
    CreateBoardComponent,
    CreateTaskComponent,
    DetailsComponent,
    KanbanComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BackendService,
    KanbanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
