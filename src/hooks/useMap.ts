import { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

declare const process: {
    env: {
        NEXT_PUBLIC_GOOGLEMAP_API_KEY: string
    }
}
const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY,
})

export const useGoogleMap = () => {
    const [googleMap, setGoogleMap] = useState<typeof google>()
    useEffect(() => {
        loader
            .load()
            .then((google) => {
                setGoogleMap(google)
            })
            .catch((e) => {
                // do something
            })
    }, [])
    return googleMap
}

export const useMap = ({
    googleMap,
    mapContainerRef,
    initialConfig,
}: any): google.maps.Map => {
    const [map, setMap] = useState(null)
    useEffect(() => {
        if (!googleMap || !mapContainerRef.current) {
            return
        }
        const map = new googleMap.maps.Map(
            mapContainerRef.current,
            initialConfig
        )
        setMap(map)
    }, [googleMap, mapContainerRef])
    // @ts-ignore
    return map
}
