"use client"

interface selectProps {
    setSelectedGym: any; 
    selectedGym: any ;
}

export default function PhoneNumberSelect(props: selectProps) {
  return (  
    <div>
        <label className="block pb-8" htmlFor="gymSelect">Pick Your Gym Here</label>
        <select onChange={(event) => { props.setSelectedGym(event.target.value) }} id="gymSelect">
            <option value="null">Blank</option>
            <option value="14155238886">Topeira Boxing Club</option>
        </select>
    </div>
  );
}
