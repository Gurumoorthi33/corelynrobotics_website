import RobotLoader from "@/components/RobotLoader";

export default function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#ffffff' }}>
      <RobotLoader size="lg" />
    </div>
  );
}
