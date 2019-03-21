/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {css} from 'lit-element';
/**
 !Note: This file is autogenerated and any changes here may be silently overridden
*/
export const style = css`:host{font-family:Roboto;--exmg-arrow-upward-url: url("/assets/arrow-upward.svg");--exmg-seleced-row-color: #f5f5f5;--exmg-hover-row-color: #f5f5f5}th[data-sort]{padding-right:25px}th[data-sort]::after{display:inline-block;content:"";background-image:var(--exmg-arrow-upward-url);background-size:12px 12px;height:12px;width:12px;margin:0 0 0 4px;opacity:0}th[data-sort-direction=ASC]::after{opacity:1;transition:transform .1s linear;transform:rotate(0deg)}th[data-sort-direction=DESC]::after{opacity:1;transition:transform .1s linear;transform:rotate(180deg)}tbody>tr:not(.row-detail):hover{background-color:var(--exmg-hover-row-color)}tr[data-selected]{background-color:var(--exmg-seleced-row-color)}tr.row-detail{display:none}input.selection-checkbox{margin:0;float:left}td.selectable-cell,th.selectable-cell{width:15px}`;
export default style;
