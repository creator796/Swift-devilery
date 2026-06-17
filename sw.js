const CACHE='swift-v2';
const ASSETS=['/Swift-devilery/index.html'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});

self.addEventListener('push',e=>{
  let data={title:'SWIFT',body:'Новое уведомление'};
  try{data=e.data.json();}catch(ex){}
  e.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:'/Swift-devilery/icon-192.png',badge:'/Swift-devilery/icon-192.png',data:data.link||'/'}));
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data||'/'));
});
