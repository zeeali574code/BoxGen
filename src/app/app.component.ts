import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MBG';
  boxes = [];
  selectedIndex;
  globalListenFunc: Function;
  ToggleValue = "Disable";

  constructor(private renderer: Renderer2) { }
  addNewBox() {
    this.boxes.push(this.boxes.length);

  }
  ToggleKeyboard() {
    if (this.ToggleValue == "Disable") {
      this.globalListenFunc();
      this.ToggleValue = "Enable";
     
    }
    else {
      this.listenKeyEvents();
      this.ToggleValue = "Disable";
      
    }
  }
  public setRow(_index: number) {
    this.selectedIndex = _index;
    if (this.ToggleValue == "Disable") {
      this.listenKeyEvents();
    }
  }
  listenKeyEvents() {
    if(this.globalListenFunc){
      this.globalListenFunc();
    }
    this.globalListenFunc = this.renderer.listen('document', 'keydown', e => {
      let element = document.getElementById('box-' + this.selectedIndex) as HTMLElement;

      switch (e.keyCode) {
        case 87:
        case 38:
          if(parseInt(element.style.top.substring(0, element.style.top.length - 1))>=10)
          element.style.top = (parseInt(element.style.top.substring(0, element.style.top.length - 1)) - 5).toString() + 'px';
          
          break;
        case 83:
        case 40:
          if(parseInt(element.style.top.substring(0, element.style.top.length - 1))<=430)
          element.style.top = (parseInt(element.style.top.substring(0, element.style.top.length - 1)) + 5).toString() + 'px';
          break;
        case 65:
        case 37:
          if(parseInt(element.style.left.substring(0, element.style.left.length - 1))>=10)
          element.style.left = (parseInt(element.style.left.substring(0, element.style.left.length - 1)) - 5).toString() + 'px';
          break;
        case 68:
        case 39:
          if(parseInt(element.style.left.substring(0, element.style.left.length - 1))<=700)
          element.style.left = (parseInt(element.style.left.substring(0, element.style.left.length - 1)) + 5).toString() + 'px';
          break;
        case 46:
          element.remove();
        default:
          break;


      }
    });

  }


  //document.querySelector("#section-one").removeEventListener("wheel", this. myFunction1, true);

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent): void {


  // }
}
