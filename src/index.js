// ✅ Include procedural block extensions
import './extend-core-button.js';
import './enrollment.js';
import './try-js-hooks.js';

// Include block extensions
import ImageBlockExtension from './extensions/ImageBlockExtension.js';

const imgExtension = new ImageBlockExtension();

imgExtension.init();