import latLongToCartesian from "./utils.ts";

interface IProps {
    lat: number,
    lon: number,
    radius: number,
    color: string,
    size: number
}

const Object = (args: IProps) => {
    const {
        lat,
        lon,
        radius,
        color,
        size
    } = args
    const [x, y, z] = latLongToCartesian(lat, lon, radius)
    return (
        <mesh position={[x, y, z]}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default Object