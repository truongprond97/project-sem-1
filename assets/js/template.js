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

const storeItemTemplate  = `
<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="<%=timeout%>">
    <div class="store-item position-relative text-center">
        <img class="img-fluid" src="<%=product.image%>" alt="">
        <div class="p-4">
            <div class="text-center mb-3">
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
            </div>
            <h4 class="mb-3"><%=product.name%></h4>
            <p><%=product.description%></p>
            <h4 class="text-primary">$<%=product.price%></h4>
        </div>
        <div class="store-overlay">
            <a href="/store/<%=product.id%>" class="btn btn-primary rounded-pill py-2 px-4 m-2">More Detail <i
                    class="fa fa-arrow-right ms-2"></i></a>
            <a href="javascript:void(0)" class="addCartItem btn btn-dark rounded-pill py-2 px-4 m-2" onclick="addCartItem(event, <%=product.id%>, 1)">Add to Cart <i
                    class="fa fa-cart-plus ms-2"></i></a>
        </div>
    </div>
</div>`
