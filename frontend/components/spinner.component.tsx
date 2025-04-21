export default function SpinnerComponent() {
    return (
        <div
          className={`
            w-5 h-5 
            text-white
            border-4 border-t-transparent border-current border-solid 
            rounded-full 
            animate-spin
          `}
        />
      )
}