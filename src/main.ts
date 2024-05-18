import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HomeModule } from '@presentation/modules/home';

platformBrowserDynamic()
  .bootstrapModule(HomeModule)
  .catch((err) => console.error(err));
