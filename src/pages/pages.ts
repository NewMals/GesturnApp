import { ListMasterPage } from './list-master/list-master';
import { SearchPage } from './search/search';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from "./welcome/welcome";
import { AreaPage } from "./gestion/area/Area.component";
import { salaEsperaPage } from "./gestion/salaEspera/salaEspera.component";
import { TicketPage } from "./gestion/ticket/Ticket.component";

// The page the user lands on after opening the app and without a session
export const FirstRunPage = WelcomePage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = AreaPage;
export const DirecPage = salaEsperaPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = salaEsperaPage;
export const Tab2Root = TicketPage;
export const Tab3Root = SettingsPage;
