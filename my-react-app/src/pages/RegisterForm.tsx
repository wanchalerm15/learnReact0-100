import { useForm } from "react-hook-form";
import "../styles/RegisterForm.css";

// 1. กำหนด Type ของข้อมูลในฟอร์ม (สำคัญมากสำหรับ TypeScript)
interface RegisterFormInputs {
    firstName: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    // 2. เปิดใช้งาน Hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    // 3. ฟังก์ชันที่จะทำงานเมื่อข้อมูล "ถูกต้องทั้งหมด" แล้วกด Submit
    const onSubmit = (data: RegisterFormInputs) => {
        console.log("ข้อมูลพร้อมส่ง API:", data);
    };

    return (
        // 4. หุ้มด้วย form และส่ง handleSubmit เข้าไปจัดการ
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-box">
                <label>ชื่อ-สกุล : </label>
                <input
                    type="text"
                    {...register("firstName", {
                        required: "กรุณากรอกชื่อผู้ใช้",
                    })}
                />
                {errors.firstName && (
                    <p style={{ color: "red" }}>{errors.firstName.message}</p>
                )}
            </div>

            <div className="form-box">
                <label>ที่อยู่อีเมล์ : </label>
                <input
                    type="email"
                    {...register("email", {
                        required: "กรุณากรอกชื่อที่อยู่อีเมล์",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "อีเมลไม่ถูกต้อง",
                        },
                    })}
                />
                {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
            </div>

            <div className="form-box">
                <label>รหัสผ่าน : </label>
                <input
                    type="password"
                    {...register("password", {
                        required: "กรุณากรอกรหัสผ่าน",
                        minLength: {
                            value: 6,
                            message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัว",
                        },
                    })}
                />
                {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
            </div>

            <button type="submit" className="register-button">
                สมัครสมาชิก
            </button>
        </form>
    );
}
