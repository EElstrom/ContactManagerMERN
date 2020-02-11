import React from "react";

const AddButton = (props) => (
  <svg className="indButton" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
  <g filter="url(#filter0_d)">
  <circle cx="39" cy="35" r="35" fill="#4DA761"/>
  </g>
  <path d="M39 17V52" stroke="white" strokeWidth="5"/>
  <path d="M21 35H57" stroke="white" strokeWidth="5"/>
  <defs>
  <filter id="filter0_d" x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="2"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
  </filter>
  </defs>
  </svg>
);

const LogoutButton = (props) => (
  <svg className="indButton" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
  <g filter="url(#filter0_d)">
  <circle cx="39" cy="35" r="35" fill="white"/>
  </g>
  <rect x="25" y="16" width="23" height="38" rx="3" stroke="#4DA761" strokeWidth="4"/>
  <rect x="42" y="30" width="15" height="9" fill="white"/>
  <path d="M64.0607 36.0607C64.6464 35.4749 64.6464 34.5251 64.0607 33.9393L54.5147 24.3934C53.9289 23.8076 52.9792 23.8076 52.3934 24.3934C51.8076 24.9792 51.8076 25.9289 52.3934 26.5147L60.8787 35L52.3934 43.4853C51.8076 44.0711 51.8076 45.0208 52.3934 45.6066C52.9792 46.1924 53.9289 46.1924 54.5147 45.6066L64.0607 36.0607ZM36 36.5L63 36.5L63 33.5L36 33.5L36 36.5Z" fill="#4DA761"/>
  <defs>
  <filter id="filter0_d" x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
  <feOffset dy="4"/>
  <feGaussianBlur stdDeviation="2"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
  </filter>
  </defs>
  </svg>
);

export {AddButton, LogoutButton};
