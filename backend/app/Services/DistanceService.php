<?php

namespace App\Services;

class DistanceService
{
    /**
     * @var integer
     */
    public const EARTH_RADIUS = 6371008;

    private function computeDelta($degrees): float|int
    {
        return M_PI / 180 * self::EARTH_RADIUS * cos($this->deg2rad($degrees));
    }

    private function deg2rad($degrees): float|int
    {
        return $degrees * M_PI / 180;
    }

    public function calcSquareCoordsForDistance($lat, $lon, $distance){
        $aroundLat = $distance / $this->computeDelta($lat);
        $aroundLon = $distance / $this->computeDelta($lon);

        return ['longitude' => $aroundLon, 'latitude' => $aroundLat];
    }

    public function calcDistanceBetweenCoords($departureLatitude, $departureLongitude, $arrivalLatitude, $arrivalLongitude): float
    {
        $a1 = deg2rad($arrivalLatitude);
        $b1 = deg2rad($arrivalLongitude);
        $a2 = deg2rad($departureLatitude);
        $b2 = deg2rad($departureLongitude);
        $res = 2 * asin(sqrt(pow(sin(($a2 - $a1) / 2), 2) + cos($a2) * cos($a1) * pow(sin(($b2 - $b1) / 2), 2)));

        return round(self::EARTH_RADIUS * $res);
    }

}
