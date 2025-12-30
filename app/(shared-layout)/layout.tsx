import { Navbar } from '@/components/web/navbar';

    
    
export default function Sharedlayout({children}:{children:React.ReactNode}){
    
     return (
				<div>
             <Navbar />
             {children}
				</div>
			)
}