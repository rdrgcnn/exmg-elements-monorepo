import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/color.js';
import './exmg-cms-color.js';
const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');

documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {
        --primary-background-color: var(--paper-grey-200);
        --secondary-background-color: #ffffff;
        --paper-listbox-background-color: #ffffff;

        --primary-color: var(--paper-em-700);
        --light-primary-color: var(--paper-em-500);
        --dark-primary-color: var(--paper-em-900);

        --secondary-color: var(--paper-ems-500);
        --light-secondary-color: var(--paper-ems-300);
        --dark-secondary-color: var(--paper-ems-700);

        --secondary-text-color: var(--paper-ems-500);

        --error-color: hsl(0, 87%, 56%);

        --shadow-elevation-2dp: {
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2),
                      0 1px 1px 0 rgba(0,0,0,0.14),
                      0 2px 1px -1px rgba(0,0,0,0.12);
        };
    }
  </style>
</custom-style>`;

document.head.appendChild(documentContainer);

/* Taken from https://www.google.com/design/spec/style/color.html#color-ui-color-application */
