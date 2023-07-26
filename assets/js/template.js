const cartTemplate = `
  <tr class="text-center" data-index="{{INDEX}}">
        <td class="product-remove">
            <a href="javascript:void(0)" {{ONCLICK_REMOVE}}>
                <i class="fas fa-times"></i>
            </a>
        </td>

        <td class="image-prod">
            <div class="img" style="background-image: url({{BACKGROUND}})"></div>
        </td>

        <td class="product-name">
            <h3>{{NAME}}</h3>
            <p>{{DESCRIPTION}}</p>
        </td>

        <td class="price">{{PRICE}}</td>

        <td class="quantity">
            <div class="input-group mb-3">
                <input type="number" name="quantity" class="quantity form-control input-number"
                       onchange="{{ONCHANGE_QUANTITY}}"
                       value="{{QUANTITY}}" min="1" max="100">
            </div>
        </td>

        <td class="total">{{TOTAL_PRICE}}</td>
    </tr><!-- END TR-->
`

