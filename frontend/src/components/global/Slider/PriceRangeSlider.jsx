import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const maxPrice = Number(20000000);
const priceGap = Number(500000);


const PriceRangeSlider = ({ prices, handleChangePrices }, ref) => {

    const rangeRef = useRef();
    const sliderRef = useRef();

    useImperativeHandle(ref, () => {
        return {slider: sliderRef};
    })

    useEffect(() => {
        if (rangeRef.current) {
            const range = rangeRef.current;
            range.style.left = ((prices.minPrice / maxPrice) * 100) + "%";
            range.style.right = (((maxPrice - prices.maxPrice) / maxPrice) * 100) + "%"
        }
    }, [prices])


    return (
        <div className='price-range-slider' ref={sliderRef}>
            <header>
                <h2>Chọn khoảng giá</h2>
                <p>Sử dụng thanh trượt để chọn giá trị nhỏ nhất và giá trị lớn nhất</p>
            </header>
            <div className="price-input">
                <div className="price-input__field">
                    <input type="text"
                        className="price-min"
                        name='minPrice'
                        value={parseInt(prices.minPrice).toLocaleString('vi-VN')}
                        readOnly
                    />
                </div>
                <div className="separator">-</div>
                <div className="price-input__field">
                    <input type="text"
                        className="price-max"
                        name='maxPrice'
                        value={parseInt(prices.maxPrice).toLocaleString('vi-VN')}
                        readOnly
                    />
                </div>
            </div>
            <div className="slider">
                <div className="progress" ref={rangeRef}></div>
            </div>
            <div className="range-input">
                <input type="range"
                    className='range-min'
                    min={0}
                    max={maxPrice}
                    name='minPrice'
                    value={prices.minPrice}
                    step={priceGap}
                    onChange={handleChangePrices}
                />
                <input type="range"
                    className='range-max'
                    min={0}
                    max={maxPrice}
                    name='maxPrice'
                    value={prices.maxPrice}
                    step={priceGap}
                    onChange={handleChangePrices}
                />
            </div>
        </div>
    )
}

export default forwardRef(PriceRangeSlider)