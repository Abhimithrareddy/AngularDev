import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listExampleArray = [{name: 'ABhi', id: 1}];

 loadedFeature = 'recipe';

onNavigate(feature: string) {
  this.loadedFeature = feature;
}


}
