export const itinerary = [
  {
    day: 1,
    editorialTitle: 'INTO THE DHAULADHAR',
    path: ['McLeod Ganj', 'Triund', 'Snowline Camp'],
    distance: '09–10 KM',
    duration: '06–07 HRS',
    altitude: 'HIGH ALTITUDE',
    description: 'Leave McLeod Ganj behind as the trail climbs through dense deodar and rhododendron forest. The landscape gradually opens toward Triund, where the Dhauladhar rises dramatically above the Kangra Valley.',
    terrain: 'TERRAIN / FOREST → ALPINE RIDGE'
  },
  {
    day: 2,
    editorialTitle: 'THE HIGH LAKES',
    path: ['Snowline Camp', 'Nag Dal', 'Kali Kund', '6th Lake Camp'],
    distance: '09–10 KM',
    duration: '07–08 HRS',
    altitude: 'GLACIAL MORAINE',
    description: 'The most demanding day of the trek. Cross above the treeline into high-altitude terrain, traversing moraines and glacial valleys as multiple lakes appear along the stark, boulder-strewn ridges.',
    terrain: 'TERRAIN / ALPINE → MORAINE'
  },
  {
    day: 3,
    editorialTitle: 'THE GREAT DIVIDE',
    path: ['6th Lake Camp', 'High Pass', 'Lam Dal', 'Kareri Lake'],
    distance: '10 KM',
    duration: '06–07 HRS',
    altitude: 'HIGH PASS',
    description: 'Continue the traverse across the high ridgeline with expansive views of the Dhauladhar range. The trail gradually descends toward the iconic Kareri Lake, where camp is set on the lakeshore.',
    terrain: 'TERRAIN / ALPINE → LAKESHORE'
  },
  {
    day: 4,
    editorialTitle: 'RETURN TO THE VALLEY',
    path: ['Kareri Lake', 'Forest Descent', 'Kareri Village'],
    distance: '07–08 KM',
    duration: '04–05 HRS',
    altitude: 'DESCENT',
    description: 'A scenic descent through forests and pastoral landscapes down to Kareri Village. The trail follows the Kareri stream, passing through Gaddi shepherd camps before reaching the roadhead.',
    terrain: 'TERRAIN / LAKESHORE → FOREST'
  },
];

export const expeditionNodes = [
  { id: 'mcleod', name: 'McLeod Ganj', elevation: 1800, type: 'start', distance: '0 km', description: 'Expedition Start' },
  { id: 'triund', name: 'Triund', elevation: 2850, type: 'waypoint', distance: '9 km', description: 'Acclimatization' },
  { id: 'snowline', name: 'Snowline Camp', elevation: 2900, type: 'camp', distance: '10 km', description: 'End of Day 1' },
  { id: 'nagdal', name: 'Nag Dal', elevation: 3500, type: 'lake', distance: '14 km', description: 'First Glacial Lake' },
  { id: 'kalikund', name: 'Kali Kund', elevation: 3700, type: 'lake', distance: '16 km', description: 'Sacred Pool' },
  { id: 'camp6', name: '6th Lake Camp', elevation: 3800, type: 'camp', distance: '18 km', description: 'High Altitude Camp' },
  { id: 'lamdal', name: 'Lam Dal', elevation: 3900, type: 'lake', distance: '22 km', description: 'Largest Lake' },
  { id: 'karerilake', name: 'Kareri Lake', elevation: 2950, type: 'camp', distance: '28 km', description: 'Final Night' },
  { id: 'kareri', name: 'Kareri Village', elevation: 1800, type: 'end', distance: '35 km', description: 'Expedition Complete' },
];

export const routeConditionNote =
  'The exact lakes covered each day may shift with weather, snow conditions and trail status, with the trek lead making the final call.';
