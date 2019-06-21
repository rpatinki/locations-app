import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  @Input() isSelectedItem: boolean;
  @Input() header: string;
  @Output() toolBarEvent: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }


  emitToolBarEvent(event: string){
    this.toolBarEvent.emit(event);
  }

  getType(): string{
    return this.header === 'Categories' ?  'category' : 'location';
  }
}
