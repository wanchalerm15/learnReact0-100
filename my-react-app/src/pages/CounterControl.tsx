// 1. เปลี่ยน Props เป็น action แทน state setter
type CounterControlProps = {
  onIncrease: () => void; // ไม่รับค่า ไม่ return ค่า แค่บอกว่าทำแล้ว
  onDecrease: () => void;
  increaseText?: string;
  decreaseText?: string;
};

export default function CounterControl({
  onIncrease,
  onDecrease,
  increaseText = "Increase",
  decreaseText = "Decrease",
}: CounterControlProps) {
  return (
    <div>
      {/* ลูกแค่เรียกฟังก์ชันที่แม่ส่งมา ไม่ต้องรู้ logic การบวกเลข */}
      <button onClick={onIncrease}>{increaseText}</button>
      <span>&nbsp;</span>
      <button onClick={onDecrease}>{decreaseText}</button>
    </div>
  );
}
