"use client"

import getWebGLStub from "@/lib/helpers/getWebGLStub"
import { terrain } from '@/lib/cesiumConfig'
import { cn } from '@/lib/utils'
import * as CesiumJS from 'cesium'
import { useEffect, useRef, useState } from 'react'
import { CesiumComponentRef, Viewer } from "resium"
import { useCesiumIonTokenSetter } from "@/hooks/useCesiumIonTokenSetter"

interface Props {
  children?: React.ReactNode
  className?: string
  testing?: boolean
}

const Cesium = ({children, className, testing=false}: Props) => {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<CesiumComponentRef<CesiumJS.Viewer>>(null);
  
  useCesiumIonTokenSetter() 


  useEffect(() => {
    if(!mounted) setMounted(true)
  }, [mounted])

  if(!mounted) return null

  return (
    <Viewer 
      ref={ref}
      contextOptions={testing ? {
        getWebGLStub: getWebGLStub
      } : undefined}
      className={cn('relative flex z-[0] overflow-clip flex-1', className)}
      full
      timeline={false}
      animation={false}
      baseLayer={testing ? false : undefined}
      baseLayerPicker={false}
      sceneModePicker={false}
      navigationHelpButton={false}
      fullscreenButton={false}
      geocoder={false}
      selectionIndicator={false}
      terrain={testing ? undefined : terrain}
      homeButton={false}
      infoBox={false}
      skyBox={false}
      scene3DOnly={true}
      automaticallyTrackDataSourceClocks={false}
      skyAtmosphere={false}
    >
      {children}
    </Viewer>
  )
}

export default Cesium