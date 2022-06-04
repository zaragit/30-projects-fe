import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=a4a4a615aefdc6686f282452e2aea568&autoload=false';

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 5, //지도의 레벨(확대, 축소 정도)
        };

        map.current = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

        window.kakao.maps.event.addListener(
          map.current,
          'rightclick',
          (mouseEvent: any) => {
            const latLng = mouseEvent.latLng;

            const title = prompt('마커의 타이틀은?');

            const marker = new window.kakao.maps.Marker({
              title,
              map: map.current,
              position: latLng,
            });

            setMarkers((prev) => [...prev, marker]);
          }
        );
      });
    };

    return () => script.remove();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          map.current.setCenter(
            new window.kakao.maps.LatLng(37.5666805, 126.9784147)
          );
        }}
      >
        서울
      </button>
      <button
        onClick={() => {
          map.current.setCenter(
            new window.kakao.maps.LatLng(35.17944, 129.07556)
          );
        }}
      >
        부산
      </button>
      <input
        type="range"
        min="1"
        max="20"
        defaultValue={5}
        onChange={(event) => {
          map.current.setLevel(event.currentTarget.value, {
            animate: true,
          });
        }}
      />
      <button
        onClick={() => {
          map.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
        }}
      >
        지도 타입 변경
      </button>
      <div ref={mapRef} id="map" style={{ width: 300, height: 300 }}></div>
      {markers.map((marker) => (
        <div
          onClick={() => {
            marker.setMap(null);
            setMarkers(markers.filter((m) => m !== marker));
          }}
        >
          {marker.getTitle()}
        </div>
      ))}
    </div>
  );
}

export default App;
