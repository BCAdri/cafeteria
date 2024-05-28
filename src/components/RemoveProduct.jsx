export const RemoveProduct = ({ onRemoveProduct }) => {
    return (
        <div className="flex justify-end">
            <button onClick={onRemoveProduct} className="bg-yellow-400 hover:bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-lg"><span>-</span></button>
        </div>
    )
}