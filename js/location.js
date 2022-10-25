import { URLChain } from './modules/urlChain.mjs';
import { Navigation } from './modules/navigation.mjs';

const btns = Navigation.getNavButtons();
const navigation = new Navigation(btns, URLChain.GetLocalChain());
navigation.addClickListeners();

// Don't ask
const iframe = document.querySelector('iframe');
iframe.src = iframe.src;