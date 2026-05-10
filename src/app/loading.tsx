import RobotLoader from "@/components/RobotLoader";

export default function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0A0A0A' }}>
      <RobotLoader size="lg" />
    </div>
  );
}
