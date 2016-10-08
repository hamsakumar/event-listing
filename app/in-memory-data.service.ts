export class InMemoryDataService {
  createDb() {
    let evnts = [
      {id: 1, eventdate: '2012-04-23T18:25', name: 'Ringling Bros. and Barnum & Bailey® Presents Out Of This World', summary: 'Intergalactic adventure for space-age family fun as the ultimate circus experience launches into the future with Ringling Bros. and Barnum & Bailey Presents Out Of This World'},
      {id: 2, eventdate: '2016-08-03T01:58',name: 'Raiders vs. Tennessee', summary: 'Raiders take on the Tennessee at home!' },
      {id: 3, eventdate: '2016-05-01T02:58',name: 'Raiders vs. Seattle', summary: 'Raiders take on the Seattle at home!'},
      {id: 4, eventdate: '2016-06-02T03:58',name: 'Athletics vs. Red Sox', summary: 'Oakland Athletics take on the Red Sox at home!'},
      {id: 5, eventdate: '2016-07-14T14:58',name: 'Athletics vs. Angels', summary: 'Oakland Athletics take on the Angels at home!'},
      {id: 6, eventdate: '2016-08-14T13:18',name: 'Athletics vs. Mariners', summary: 'Oakland Athletics take on the Mariners at home!'},
      {id: 7, eventdate: '2016-03-01T11:18',name: 'Drake: Summer Sixteen Tour', summary: 'What a Time to Be Alive duo Drake and Future will hit the road together on the Summer Sixteen Tour'},
      {id: 8, eventdate: '2016-05-03T11:38',name: 'Black Sabbath', summary: 'The Greatest Metal Band of All Time'},
      {id: 9, eventdate: '2016-06-06T01:58',name: 'Athletics vs. Astros', summary: 'Oakland Athletics take on the Astros at home!'},
      {id: 10, eventdate: '2016-01-08T04:10',name: 'Athletics vs. Rangers', summary: 'Oakland Athletics take on the Texas Rangers at home!'}
    ];
    return {evnts};
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/